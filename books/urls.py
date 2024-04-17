from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from .views import BookView, StoreView

router = routers.DefaultRouter()
router.register(r'books', BookView, basename='books')
router.register(r'stores', StoreView, basename='stores')

urlpatterns = [
    path('', include(router.urls)),
]