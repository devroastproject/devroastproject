from django.test import TestCase
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
class SeleniumTest(TestCase):
  def setUp(self):
        self.chrome = webdriver.Remote(
            command_executor='http://selenium_hub:4444/wd/hub',
            desired_capabilities=DesiredCapabilities.CHROME
        )
        self.chrome.implicitly_wait(10)
        self.firefox = webdriver.Remote(
            command_executor='http://selenium_hub:4444/wd/hub',
            desired_capabilities=DesiredCapabilities.FIREFOX
        )
        self.firefox.implicitly_wait(10)
  def test_visit_site_with_chrome(self):
        self.chrome.get('http://django:8000')
        self.assertIn(self.chrome.title, 'Django: the Web framework for perfectionists with deadlines.')
  def test_visit_site_with_firefox(self):
        self.firefox.get('http://django:8000')
        self.assertIn(self.firefox.title, 'Django: the Web framework for perfectionists with deadlines.')

# from django.test import LiveServerTestCase
# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys

# class LoginTestCase(LiveServerTestCase):

#     def setUp(self):
#         self.selenium = webdriver.Chrome()
#         super(LoginTestCase, self).setUp()
    
#     def tearDown(self):
#         self.selenium.quit()
#         super(LoginTestCase, self).setUp()

#     def test_login(self):
#         selenium = self.selenium
#         selenium.get("http://localhost:3000/login")
#         user_name = selenium.find_elements_by_id("User Name")
#         email = selenium.find_elements_by_id("Email")
#         password = selenium.find_elements_by_id("Password")
#         login = selenium.find_elements_by_id("login")

#         user_name.send_keys('user')
#         email.send_keys('user@example.com')
#         password.send_keys('userspword')
#         login.send_keys(Keys.RETURN)

#         assert 'user is Logged In' in selenium.page_source
#         assert 'Something Went Wrong' not in selenium.page_source
