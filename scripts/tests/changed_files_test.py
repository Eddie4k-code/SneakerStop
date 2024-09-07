import unittest
from changed_files import get_changed_files

class TestGetChangedFiles(unittest.TestCase):

    def test_no_files(self):
        self.assertEqual(get_changed_files([]), [])

    def test_no_matching_services(self):
        files = ["other-service/file.txt", "another-service/anotherfile.txt"]
        self.assertEqual(get_changed_files(files), [])

    def test_some_matching_services(self):
        files = ["auth-service/file1.txt", "order-service/file2.txt", "unrelated/file3.txt"]
        self.assertEqual(get_changed_files(files), ["auth-service", "order-service"])

    def test_all_matching_services(self):
        files = ["auth-service/file1.txt", "sneaker-service/file2.txt", "order-service/file3.txt"]
        self.assertEqual(get_changed_files(files), ["auth-service", "sneaker-service", "order-service"])

    def test_duplicate_services(self):
        files = ["auth-service/file1.txt", "auth-service/file2.txt"]
        self.assertEqual(get_changed_files(files), ["auth-service"])

if __name__ == "__main__":
    unittest.main()