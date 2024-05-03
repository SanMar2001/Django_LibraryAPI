from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, logout
from django.contrib.auth.models import User
from .models import Admin, Client, Root
from rest_framework import viewsets
from .serializers import AdminSerializer, ClientSerializer, RootSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404

class RootView(viewsets.ModelViewSet):
    serializer_class = RootSerializer
    queryset = Root.objects.all()

class AdminView(viewsets.ModelViewSet):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()

class ClientView(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

class LoginView(APIView):
    permission_classes = [AllowAny]  # Permitir acceso a usuarios no autenticados

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user:
            if Root.objects.filter(user=User.objects.get(username=request.data.get('username'))).exists():
                user_type = 'root'
            elif Admin.objects.filter(user=User.objects.get(username=request.data.get('username'))).exists():
                user_type = 'admin'
                Admin_obj = Admin.objects.get(user__username = request.data.get('username'))
                id = Admin_obj.id
            elif Client.objects.filter(user=User.objects.get(username=request.data.get('username'))).exists():
                user_type = 'client'
                Client_obj = Client.objects.get(user__username = request.data.get('username'))
                id = Client_obj.id
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'type': str(user_type),
                'id' : str(id)
            })
        else:
            return Response({'error': 'Nombre de usuario o contraseña incorrectos'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    authentication_classes = [JWTAuthentication]  # Requiere autenticación JWT
    permission_classes = [IsAuthenticated]  # Requiere autenticación

    def post(self, request):
        logout(request)
        return Response({"message": "¡Has cerrado sesión correctamente!"}, status=status.HTTP_200_OK)
