from .serializers import BookSerializer, StoreSerializer
from django.http import JsonResponse
from .models import Book, Store
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

# Create your views here.
class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

class StoreView(viewsets.ModelViewSet):
    serializer_class = StoreSerializer
    queryset = Store.objects.all()

class NewsView(APIView):
    permission_classes = [AllowAny]
    #Método get para obtener los libros en orden de fecha
    def get(self, request):
        books = Book.objects.order_by('-pubDate').values()
        return JsonResponse(list(books), safe=False)
