from django.urls import path, include
from rest_framework import routers
from .views import BookView, StoreView, NewsView, CardView, SaleView, DevolutionView, ReservationView, ChatView, MessageView

router = routers.DefaultRouter()
router.register(r'books', BookView, basename='books')
router.register(r'stores', StoreView, basename='stores')
router.register(r'cards', CardView, basename='cards')
router.register(r'sales', SaleView, basename='sales')
router.register(r'devolutions', DevolutionView, basename='devolutions')
router.register(r'reservations', ReservationView, basename='reservations')
router.register(r'chats', ChatView, basename='chats')
router.register(r'messages', MessageView, basename='messages')

urlpatterns = [
    path('', include(router.urls)),
    path('news/', NewsView.as_view(), name="news"),
]