import time
import pickle
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# Function to initialize the browser and login to WhatsApp Web
def create_whatsapp_session():
    # Set up Chrome options for headless mode (optional)
    options = Options()
    options.add_argument("--headless")  # Run in headless mode (without opening browser window)
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--remote-debugging-port=9222")  # For debugging, optional

    # Set up WebDriver with Chrome
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    # Open WhatsApp Web
    driver.get("https://web.whatsapp.com")

    print("Please scan the QR code with your phone to log in...")

    # Wait for the QR code to be scanned by the user
    while True:
        try:
            # Check if the user has logged in by looking for an element only present when logged in
            if driver.find_element("xpath", "//span[@data-testid='side']"):
                print("Successfully logged in to WhatsApp!")
                break
        except Exception as e:
            print("Waiting for QR code scan...")
            time.sleep(5)  # Wait for 5 seconds before checking again

    # Save the session data (cookies) to a file
    cookies = driver.get_cookies()
    with open("whatsapp_session.pkl", "wb") as session_file:
        pickle.dump(cookies, session_file)
    
    print("Session saved to whatsapp_session.pkl")

    # Close the browser
    driver.quit()

if __name__ == "__main__":
    create_whatsapp_session()
