from django.urls import path, include
from rest_framework import routers
from .views import BookView, StoreView, NewsView

router = routers.DefaultRouter()
router.register(r'books', BookView, basename='books')
router.register(r'stores', StoreView, basename='stores')

urlpatterns = [
    path('', include(router.urls)),
    path('news/', NewsView.as_view(), name="news"),
]