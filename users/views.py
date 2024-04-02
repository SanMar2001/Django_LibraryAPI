from .models import Admin, Client
from rest_framework import viewsets
from .serializer import AdminSerializer, ClientSerializer

class AdminView(viewsets.ModelViewSet):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()

class ClientView(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
