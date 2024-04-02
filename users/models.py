from django.contrib.auth.models import User
from django.db import models

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dni = models.CharField(max_length=30, blank=False)
    names = models.CharField(max_length=80, blank=False)
    surnames = models.CharField(max_length=80, blank=False)
    birthdate = models.DateField(null=False)
    birthplace = models.CharField(max_length=30)
    address = models.CharField(max_length=100)
    gender = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.names} {self.surnames}"
        
class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dni = models.CharField(max_length=30, blank=False)
    names = models.CharField(max_length=80, blank=False)
    surnames = models.CharField(max_length=80, blank=False)
    birthdate = models.DateField(null=False)
    birthplace = models.CharField(max_length=30)
    address = models.CharField(max_length=100)
    gender = models.CharField(max_length=30)
    fav_topics = models.TextField(blank=True)

    def __str__(self):
        return f"{self.names} {self.surnames}"