from django.contrib.auth.models import User
from .models import Admin, Client, Root
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']  # Personaliza los campos según tus necesidades

class RootSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Root
        fields = ['id', 'user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        root = Root.objects.create(user=user, **validated_data)
        return root

class AdminSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Admin
        fields = ['id', 'user', 'dni', 'names', 'surnames', 'birthdate', 'birthplace', 'address', 'gender']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        admin = Admin.objects.create(user=user, **validated_data)
        return admin

class ClientSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Client
        fields = ['id', 'user', 'dni', 'names', 'surnames', 'birthdate', 'birthplace', 'address', 'gender', 'fav_topics']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        client = Client.objects.create(user=user, **validated_data)
        return client
