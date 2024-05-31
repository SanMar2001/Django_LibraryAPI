from django.db import models
from users.models import Client, Admin
from django.utils import timezone
from django.contrib.auth.models import User

#Tuplas para choices
conditions = [('Nuevo',"Nuevo"), ('Usado', "Usado")]

# Create your models here.
class Store(models.Model):
    address = models.CharField(max_length=100)
    schedule = models.CharField(max_length=100, blank=True, default="8 AM - 6 PM")

    def __str__(self):
        return f"Tienda: {self.id}"

class Book(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, limit_choices_to={'id__in': Store.objects.all().values_list('id', flat=True)})
    title = models.CharField(max_length=100, blank=False)
    author = models.CharField(max_length=100, blank=False)
    pubYear = models.PositiveIntegerField(null=False)
    gender = models.CharField(max_length=100, blank=False)
    pages = models.PositiveIntegerField(null=False)
    editorial = models.CharField(max_length=100, blank=False)
    issbn = models.CharField(max_length=50, blank=False)
    language = models.CharField(max_length=20, blank=False)
    pubDate = models.DateField(null=False)
    condition = models.CharField(max_length=20, blank=False, choices=conditions, default="")
    price = models.PositiveIntegerField(null=False)
    reserved = models.BooleanField(default=False, blank=True)
    sold = models.BooleanField(default=False, blank=True)
    image = models.ImageField(upload_to='image/', default='default.jpg')

    def __str__(self):
        return self.title

class Card(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    number = models.PositiveBigIntegerField(blank=False)
    name = models.CharField(max_length=50, blank=False)
    cv = models.PositiveIntegerField(blank=False)
    cadMonth = models.CharField(max_length=2, blank=False)
    cadYear = models.CharField(max_length=4, blank=False)
    wallet = models.PositiveBigIntegerField(blank=False)

class Sale(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now, blank=True)
    delivered = models.BooleanField(default=False)
    returned = models.BooleanField(default=False)

class Reservation(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    expired = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)

class Devolution(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE)
    description = models.TextField(blank=False)
    image = models.ImageField(upload_to='image/', default='default.jpg')
    validated = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)


class Chat(models.Model):
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    closed = models.BooleanField(default=False)

class Message(models.Model):
    content = models.TextField(blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    usertype = models.CharField(blank=False, max_length=8)
    date = models.DateTimeField(default=timezone.now)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)