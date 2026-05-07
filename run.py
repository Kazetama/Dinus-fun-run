import sys
import os

# Add src to python path
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))

if __name__ == "__main__":
    from main import JumpApp, QApplication
    
    app = QApplication(sys.argv)
    window = JumpApp()
    window.showMaximized()
    sys.exit(app.exec())
