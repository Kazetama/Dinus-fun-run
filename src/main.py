import sys
import cv2
import torch
import time
import os
from ultralytics import YOLO
from collections import defaultdict, deque

from PySide6.QtWidgets import (
    QApplication, QLabel, QPushButton,
    QVBoxLayout, QHBoxLayout, QWidget, QSizePolicy, QStackedWidget, QSpacerItem
)
import random
from PySide6.QtGui import QImage, QPixmap, QPainter, QColor, QLinearGradient, QFont, QBrush, QPen
from PySide6.QtCore import QTimer, Qt, QUrl, QPointF
from PySide6.QtMultimedia import QSoundEffect
from PySide6.QtWidgets import QGraphicsDropShadowEffect

# Path configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "yolov8n-pose.pt")
AUDIO_DIR = os.path.join(BASE_DIR, "assets", "audio")
IMAGE_DIR = os.path.join(BASE_DIR, "assets", "images")

HISTORY_LEN = 5
FINISH_SCORE = 20

MIN_RISE = 10
MIN_JUMP = 25
MIN_FALL = 10

device = "cuda" if torch.cuda.is_available() else "cpu"
model = YOLO(MODEL_PATH)
model.to(device)


class CaptureWindow(QWidget):
    def __init__(self, parent=None):
        super().__init__()
        self.parent = parent

        self.setWindowTitle("Capture Window")

        self.label = QLabel()
        self.label.setAlignment(Qt.AlignCenter)
        self.label.setStyleSheet("background:black;")

        self.btn_capture = QPushButton("Capture")
        self.btn_capture.clicked.connect(self.capture_image)

        layout = QVBoxLayout()
        layout.addWidget(self.label)
        layout.addWidget(self.btn_capture)
        self.setLayout(layout)

        self.timer = QTimer()
        self.timer.timeout.connect(self.update_preview)
        self.timer.start(50)

    def update_preview(self):
        if self.parent.current_frame is None:
            return

        frame = cv2.flip(self.parent.current_frame, 1)
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        h, w, ch = rgb.shape
        img = QImage(rgb.data, w, h, ch*w, QImage.Format_RGB888)
        self.label.setPixmap(QPixmap.fromImage(img))

    def capture_image(self):
        if self.parent.current_frame is None:
            return

        filename = f"capture_{int(time.time())}.jpg"
        cv2.imwrite(filename, self.parent.current_frame)
        print("Saved:", filename)


class JumpApp(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Jump Battle Race | Premium Edition")
        self.apply_styles()

        self.game_mode = "PVP" # "PVP" or "AI"
        
        # Game State Variables
        self.is_playing = False
        self.countdown = None
        self.left_start_time = None
        self.right_start_time = None
        self.left_time = 0
        self.right_time = 0
        self.left_score = 0
        self.right_score = 0
        self.winner = None
        self.data_store = {}
        self.history_y = defaultdict(lambda: deque(maxlen=HISTORY_LEN))
        self.current_frame = None

        # AI Variables
        self.ai_last_jump_time = 0
        self.ai_target_cooldown = 1.0

        # Assets
        self.snd_go = QSoundEffect()
        self.snd_jump = QSoundEffect()
        self.snd_finish = QSoundEffect()
        self.snd_go.setSource(QUrl.fromLocalFile(os.path.join(AUDIO_DIR, "go.wav")))
        self.snd_jump.setSource(QUrl.fromLocalFile(os.path.join(AUDIO_DIR, "jump.wav")))
        self.snd_finish.setSource(QUrl.fromLocalFile(os.path.join(AUDIO_DIR, "finish.wav")))
        self.snd_go.setVolume(0.5)
        self.snd_jump.setVolume(0.5)
        self.snd_finish.setVolume(0.7)

        self.icon1 = QPixmap(os.path.join(IMAGE_DIR, "nl.png"))
        self.icon2 = QPixmap(os.path.join(IMAGE_DIR, "nl.png"))
        self.icon_size = 140
        
        self.running_frames = []
        self.current_frame_idx = 0
        webm_path = os.path.join(IMAGE_DIR, "runing.webm")
        if os.path.exists(webm_path):
            cap_webm = cv2.VideoCapture(webm_path)
            while True:
                ret, wframe = cap_webm.read()
                if not ret:
                    break
                import numpy as np
                rgba = cv2.cvtColor(wframe, cv2.COLOR_BGR2RGBA)
                black_pixels = (rgba[:, :, 0] < 30) & (rgba[:, :, 1] < 30) & (rgba[:, :, 2] < 30)
                rgba[black_pixels, 3] = 0
                rgba_copy = rgba.copy()
                wh, ww, wch = rgba_copy.shape
                wimg = QImage(rgba_copy.data, ww, wh, wch*ww, QImage.Format_RGBA8888)
                self.running_frames.append(QPixmap.fromImage(wimg))
            cap_webm.release()

        self.icon_happy = os.path.join(IMAGE_DIR, "happy.png")
        self.icon_sad = os.path.join(IMAGE_DIR, "sad.png")

        # Camera
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

        # Timers
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_frame)
        self.timer.start(50)

        self.countdown_timer = QTimer()
        self.countdown_timer.timeout.connect(self.update_countdown)

        # Build UI
        self.stacked_widget = QStackedWidget()
        
        self.menu_page = self.create_menu_page()
        self.game_page = self.create_game_page()

        self.stacked_widget.addWidget(self.menu_page)
        self.stacked_widget.addWidget(self.game_page)

        main_layout = QVBoxLayout()
        main_layout.setContentsMargins(0, 0, 0, 0)
        main_layout.addWidget(self.stacked_widget)
        self.setLayout(main_layout)

    def create_menu_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        layout.setAlignment(Qt.AlignCenter)
        
        title = QLabel("JUMP BATTLE RACE")
        title.setStyleSheet("font-size: 64px; font-weight: bold; color: #00f2ff; margin-bottom: 10px;")
        title.setAlignment(Qt.AlignCenter)
        
        subtitle = QLabel("Premium Edition")
        subtitle.setStyleSheet("font-size: 24px; color: #aaaaaa; margin-bottom: 50px;")
        subtitle.setAlignment(Qt.AlignCenter)
        
        btn_pvp = QPushButton("👥 Player vs Player")
        btn_pvp.setFixedSize(300, 60)
        btn_pvp.setStyleSheet("font-size: 20px;")
        btn_pvp.clicked.connect(lambda: self.enter_game("PVP"))
        
        btn_ai = QPushButton("🤖 Player vs AI")
        btn_ai.setFixedSize(300, 60)
        btn_ai.setStyleSheet("font-size: 20px;")
        btn_ai.clicked.connect(lambda: self.enter_game("AI"))
        
        layout.addWidget(title)
        layout.addWidget(subtitle)
        layout.addWidget(btn_pvp, 0, Qt.AlignHCenter)
        layout.addSpacing(20)
        layout.addWidget(btn_ai, 0, Qt.AlignHCenter)
        
        return page

    def create_game_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        layout.setContentsMargins(20, 20, 20, 20)
        layout.setSpacing(20)

        self.video_label = QLabel()
        self.video_label.setAlignment(Qt.AlignCenter)
        self.video_label.setObjectName("videoLabel")
        self.video_label.setScaledContents(True)
        self.video_label.setSizePolicy(QSizePolicy.Ignored, QSizePolicy.Ignored)

        self.race_label = QLabel()
        self.race_label.setFixedHeight(120)
        self.race_label.setObjectName("raceLabel")
        self.race_label.setSizePolicy(QSizePolicy.Ignored, QSizePolicy.Fixed)

        btn_play = QPushButton("▶ Play")
        btn_pause = QPushButton("⏸ Pause")
        btn_reset = QPushButton("🔄 Reset")
        btn_capture = QPushButton("📷 Capture")
        btn_back = QPushButton("🚪 Back to Menu")

        btn_play.clicked.connect(self.start)
        btn_pause.clicked.connect(self.stop)
        btn_reset.clicked.connect(self.reset)
        btn_capture.clicked.connect(self.open_capture_window)
        btn_back.clicked.connect(self.exit_game)

        btn_layout = QHBoxLayout()
        btn_layout.setSpacing(15)
        btn_layout.addWidget(btn_play)
        btn_layout.addWidget(btn_pause)
        btn_layout.addWidget(btn_reset)
        btn_layout.addWidget(btn_capture)
        btn_layout.addStretch()
        btn_layout.addWidget(btn_back)

        main_container = QWidget()
        main_container.setObjectName("mainContainer")
        container_layout = QVBoxLayout(main_container)
        container_layout.setContentsMargins(10, 10, 10, 10)
        container_layout.addWidget(self.video_label)
        container_layout.addLayout(btn_layout)

        layout.addWidget(self.race_label)
        layout.addWidget(main_container)

        for widget in [self.race_label, main_container]:
            shadow = QGraphicsDropShadowEffect()
            shadow.setBlurRadius(25)
            shadow.setColor(QColor(0, 0, 0, 150))
            shadow.setOffset(0, 5)
            widget.setGraphicsEffect(shadow)

        self.update_race()
        return page

    def enter_game(self, mode):
        self.game_mode = mode
        self.reset()
        self.stacked_widget.setCurrentWidget(self.game_page)
        
    def exit_game(self):
        self.stop()
        self.stacked_widget.setCurrentWidget(self.menu_page)

    def apply_styles(self):
        self.setStyleSheet("""
            QWidget {
                background-color: #0d0d0d;
                font-family: 'Segoe UI', sans-serif;
                color: #ffffff;
            }
            #raceLabel, #mainContainer {
                background-color: rgba(30, 30, 30, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
            }
            #videoLabel {
                background-color: #000;
                border-radius: 10px;
            }
            QPushButton {
                background-color: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: rgba(255, 255, 255, 0.15);
                border: 1px solid #00f2ff;
            }
            QPushButton#btn_play:hover {
                background-color: rgba(0, 242, 255, 0.2);
            }
        """)

    def overlay_icon(self, frame, img_path, x, y, size=220):
        icon = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
        if icon is None:
            return frame

        icon = cv2.resize(icon, (size, size))
        h, w = icon.shape[:2]

        x = int(x - w // 2)
        y = int(y - h // 2)

        if icon.shape[2] == 4:
            alpha = icon[:, :, 3] / 255.0
            for c in range(3):
                frame[y:y+h, x:x+w, c] = (
                    alpha * icon[:, :, c] +
                    (1 - alpha) * frame[y:y+h, x:x+w, c]
                )
        else:
            frame[y:y+h, x:x+w] = icon

        return frame

    def open_capture_window(self):
        self.capture_window = CaptureWindow(self)
        self.capture_window.show()

    def start(self):
        if self.winner:
            return

        self.reset()
        self.countdown = 3
        self.countdown_timer.start(1000)

    def update_countdown(self):
        if self.countdown > 0:
            self.countdown -= 1
        else:
            self.countdown_timer.stop()
            self.countdown = None

            now = time.time()
            self.left_start_time = now
            self.right_start_time = now

            self.is_playing = True

    def stop(self):
        self.is_playing = False

    def reset(self):
        self.left_score = 0
        self.right_score = 0
        self.winner = None
        self.data_store.clear()
        self.history_y.clear()

        self.left_start_time = None
        self.right_start_time = None
        self.left_time = 0
        self.right_time = 0
        self.is_playing = False

        self.update_race()

    def update_race(self):
        w = self.race_label.width()
        h = self.race_label.height()
        if w <= 0 or h <= 0: return

        pix = QPixmap(w, h)
        pix.fill(Qt.transparent)

        painter = QPainter(pix)
        painter.setRenderHint(QPainter.Antialiasing)

        p1 = min(1.0, self.left_score / FINISH_SCORE)
        p2 = min(1.0, self.right_score / FINISH_SCORE)

        y1, y2 = 40, 80
        bar_h = 14

        # Background Bars
        painter.setPen(Qt.NoPen)
        painter.setBrush(QColor(40, 40, 40, 150))
        painter.drawRoundedRect(20, y1 - bar_h // 2, w - 40, bar_h, 7, 7)
        painter.drawRoundedRect(20, y2 - bar_h // 2, w - 40, bar_h, 7, 7)

        # Player 1 Neon Bar (Cyan)
        grad1 = QLinearGradient(20, 0, w - 20, 0)
        grad1.setColorAt(0, QColor(0, 242, 255, 50))
        grad1.setColorAt(p1 if p1 > 0 else 0.01, QColor(0, 242, 255))
        grad1.setColorAt(1, QColor(0, 242, 255, 20))
        
        painter.setBrush(grad1)
        painter.drawRoundedRect(20, y1 - bar_h // 2, int((w - 40) * p1), bar_h, 7, 7)

        # Player 2 Neon Bar (Electric Purple)
        grad2 = QLinearGradient(20, 0, w - 20, 0)
        grad2.setColorAt(0, QColor(112, 0, 255, 50))
        grad2.setColorAt(p2 if p2 > 0 else 0.01, QColor(112, 0, 255))
        grad2.setColorAt(1, QColor(112, 0, 255, 20))

        painter.setBrush(grad2)
        painter.drawRoundedRect(20, y2 - bar_h // 2, int((w - 40) * p2), bar_h, 7, 7)

        # Icons
        if hasattr(self, 'running_frames') and self.running_frames:
            current_icon = self.running_frames[self.current_frame_idx]
        else:
            current_icon = self.icon1

        icon1 = current_icon.scaled(80, 80, Qt.KeepAspectRatio, Qt.SmoothTransformation)
        icon2 = current_icon.scaled(80, 80, Qt.KeepAspectRatio, Qt.SmoothTransformation)

        painter.drawPixmap(int(20 + (w - 40) * p1) - icon1.width() // 2, y1 - icon1.height() // 2, icon1)
        painter.drawPixmap(int(20 + (w - 40) * p2) - icon2.width() // 2, y2 - icon2.height() // 2, icon2)

        # Labels
        painter.setPen(QColor(255, 255, 255))
        painter.setFont(QFont("Segoe UI", 10, QFont.Bold))
        painter.drawText(20, y1 - 15, f"PLAYER 1: {self.left_score}")
        right_name = "AI OPPONENT" if getattr(self, 'game_mode', 'PVP') == "AI" else "PLAYER 2"
        painter.drawText(20, y2 - 15, f"{right_name}: {self.right_score}")

        painter.end()
        self.race_label.setPixmap(pix)

    def update_frame(self):
        ret, frame = self.cap.read()
        if not ret:
            return

        self.current_frame = frame.copy()

        if hasattr(self, 'running_frames') and self.running_frames:
            self.current_frame_idx = (self.current_frame_idx + 1) % len(self.running_frames)
            self.update_race()

        # AI LOGIC
        if getattr(self, 'game_mode', 'PVP') == "AI" and self.is_playing:
            now = time.time()
            if now - self.ai_last_jump_time > self.ai_target_cooldown:
                self.right_score += 1
                self.snd_jump.play()
                self.update_race()
                self.ai_last_jump_time = now
                
                # Dynamic Difficulty (Rubber Banding)
                diff = self.left_score - self.right_score
                base = random.uniform(0.7, 1.2) # AI naturally jumps every 0.7-1.2s
                adjustment = diff * 0.1 # if player leads by 5, adjustment = 0.5s faster
                self.ai_target_cooldown = max(0.4, base - adjustment)
                
                if self.right_score >= FINISH_SCORE:
                    self.winner = "AI OPPONENT WIN"
                    self.snd_finish.play()
                    self.stop()

        frame = cv2.flip(frame, 1)
        h, w, _ = frame.shape
        mid = w // 2

        # update waktu
        if self.left_start_time is not None and self.winner is None:
            self.left_time = time.time() - self.left_start_time
        if self.right_start_time is not None and self.winner is None:
            self.right_time = time.time() - self.right_start_time

        results = model.predict(frame, conf=0.5, device=device)

        # Adaptive brightness calculation (OpenCV mean is very fast)
        avg_brightness = cv2.mean(frame)[0]
        text_color = (0, 0, 0) if avg_brightness > 127 else (255, 255, 255)

        if results[0].keypoints is not None:
            keypoints = results[0].keypoints.xy.cpu().numpy()
            confidences = results[0].keypoints.conf.cpu().numpy()

            players = []

            # ambil semua kandidat player (berdasarkan bahu agar lebih stabil di webcam)
            for i, kp in enumerate(keypoints):
                ls, rs = kp[5], kp[6]
                conf = (confidences[i][5] + confidences[i][6]) / 2

                if (ls == 0).all() and (rs == 0).all():
                    continue

                if (ls == 0).all():
                    cx, cy = rs
                elif (rs == 0).all():
                    cx, cy = ls
                else:
                    cx = (ls[0] + rs[0]) / 2
                    cy = (ls[1] + rs[1]) / 2

                players.append((cx, cy, conf))

            # pilih hanya 1 kiri dan 1 kanan (paling dekat ke tengah)
            left_player = None
            right_player = None

            for (cx, cy, conf) in players:
                if cx < mid:
                    if left_player is None or cx > left_player[0]:
                        left_player = (cx, cy, conf)
                else:
                    if right_player is None or cx < right_player[0]:
                        right_player = (cx, cy, conf)

            tracked = {
                "left": left_player,
                "right": right_player
            }

            for side, player in tracked.items():
                if getattr(self, 'game_mode', 'PVP') == "AI" and side == "right":
                    continue
                if player is None:
                    continue

                cx, cy, conf = player

                self.history_y[side].append(cy)
                if len(self.history_y[side]) < HISTORY_LEN:
                    continue

                cy = sum(self.history_y[side]) / len(self.history_y[side])

                # Draw Confidence Bar
                bar_w = 60
                bar_h = 6
                bx, by = int(cx - bar_w // 2), int(cy - 25)
                cv2.rectangle(frame, (bx, by), (bx + bar_w, by + bar_h), (50, 50, 50), -1)
                bar_color = (0, 255, 0) if conf > 0.7 else (0, 255, 255)
                cv2.rectangle(frame, (bx, by), (bx + int(bar_w * conf), by + bar_h), bar_color, -1)
                
                # Glow effect for detected point
                cv2.circle(frame, (int(cx), int(cy)), 12, (text_color[0], text_color[1], text_color[2]), 2)
                cv2.circle(frame, (int(cx), int(cy)), 4, bar_color, -1)

                if side not in self.data_store:
                    self.data_store[side] = {
                        "y": cy,
                        "state": "ground",
                        "peak_y": cy
                    }
                    continue

                d = self.data_store[side]

                if d["state"] == "ground":
                    if cy < d["y"] - MIN_RISE:
                        d["state"] = "up"
                        d["start_y"] = cy
                        d["peak_y"] = cy

                elif d["state"] == "up":
                    if cy < d["peak_y"]:
                        d["peak_y"] = cy

                    if cy > d["peak_y"] + MIN_FALL:
                        jump_height = d["start_y"] - d["peak_y"]

                        if jump_height > MIN_JUMP and self.is_playing:
                            self.snd_jump.play()

                            if side == "left":
                                self.left_score += 1
                            else:
                                self.right_score += 1

                            self.update_race()

                            if self.left_score >= FINISH_SCORE:
                                self.winner = "PLAYER 1 WIN"
                                self.snd_finish.play()
                                self.stop()

                            elif self.right_score >= FINISH_SCORE:
                                self.winner = "AI OPPONENT WIN" if getattr(self, 'game_mode', 'PVP') == "AI" else "PLAYER 2 WIN"
                                self.snd_finish.play()
                                self.stop()

                        d["state"] = "ground"

                d["y"] = cy

                # titik merah tetap muncul
                cv2.circle(frame, (int(cx), int(cy)), 8, (0, 0, 255), -1)

        # adaptive text color logic
        avg_brightness = cv2.mean(frame)[0]
        text_color = (0, 0, 0) if avg_brightness > 127 else (255, 255, 255)

        # countdown
        if self.countdown is not None:
            text = str(self.countdown + 1) if self.countdown > 0 else "GO!"
            # Shadow for countdown text
            cv2.putText(frame, text, (int(w*0.4)+4, int(h*0.6)+4),
                        cv2.FONT_HERSHEY_SIMPLEX, 4, (0, 0, 0), 10)
            cv2.putText(frame, text, (int(w*0.4), int(h*0.6)),
                        cv2.FONT_HERSHEY_SIMPLEX, 4, text_color, 8)

        # timer kiri kanan
        if self.left_start_time is not None:
            left_text = f"{self.left_time:.3f}s"
            right_text = f"{self.right_time:.3f}s"

            cv2.putText(frame, left_text, (20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, text_color, 2)

            text_size = cv2.getTextSize(right_text,
                                        cv2.FONT_HERSHEY_SIMPLEX, 1, 2)[0]

            cv2.putText(frame, right_text,
                        (w - text_size[0] - 20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, text_color, 2)

            # =========================
            # 🔥 WINNER CHECK + DISPLAY (TARUH DI SINI)
            # =========================
            if not self.winner:
                if self.left_score >= FINISH_SCORE:
                    self.winner = "PLAYER 1 WIN"
                elif self.right_score >= FINISH_SCORE:
                    self.winner = "AI OPPONENT WIN" if getattr(self, 'game_mode', 'PVP') == "AI" else "PLAYER 2 WIN"

            if self.winner:
                left_pos = (int(w * 0.25), int(h * 0.5))
                right_pos = (int(w * 0.75), int(h * 0.5))

                if self.winner == "PLAYER 1 WIN":
                    frame = self.overlay_icon(frame, self.icon_happy, *left_pos, 260)
                    frame = self.overlay_icon(frame, self.icon_sad, *right_pos, 260)

                    cv2.putText(frame, "WIN", left_pos,
                                cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 4)
                    cv2.putText(frame, "LOSE", right_pos,
                                cv2.FONT_HERSHEY_SIMPLEX, 2, (100, 100, 100), 4)
                else:
                    frame = self.overlay_icon(frame, self.icon_sad, *left_pos, 260)
                    frame = self.overlay_icon(frame, self.icon_happy, *right_pos, 260)

                    cv2.putText(frame, "LOSE", left_pos,
                                cv2.FONT_HERSHEY_SIMPLEX, 2, (100, 100, 100), 4)
                    cv2.putText(frame, "WIN", right_pos,
                                cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 0, 0), 4)

        cv2.line(frame, (mid,0), (mid,h), (255,255,255), 2)

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        h, w, ch = rgb.shape
        img = QImage(rgb.data, w, h, ch*w, QImage.Format_RGB888)

        self.video_label.setPixmap(QPixmap.fromImage(img))

app = QApplication(sys.argv)
window = JumpApp()
window.showMaximized()
sys.exit(app.exec())