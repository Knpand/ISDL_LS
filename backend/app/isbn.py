import requests
import time

RAKUTEN_BOOKS_API_URL = ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
# IDはalexが取得した
RAKUTEN_APP_ID = ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

class RAKUTENAPI:
  def get_book_info_by_isbn(self, isbn):
      time.sleep(0.5)
      response = requests.get("{}?applicationId={}&isbn={}".format(RAKUTEN_BOOKS_API_URL, RAKUTEN_APP_ID, isbn))
      print("{}?applicationId={}&amp;isbnjan={}".format(RAKUTEN_BOOKS_API_URL, RAKUTEN_APP_ID, isbn))
      if response.status_code != requests.codes.ok:
          print("Requests failed")
      elif response.json()["count"] == 0:
          print("No book found: isbn {}".format(isbn))
      else:
          print("Book found: {}".format(response.json()["Items"][0]["Item"]["author"]))
          info = response.json()["Items"][0]["Item"]
          data = []
          data.append(info["title"])
          data.append(info["isbn"])
          data.append(info["author"])
          data.append(info["authorKana"])
          data.append(info["publisherName"])
          data.append(info["itemCaption"])
          data.append(info["largeImageUrl"])
          return data
