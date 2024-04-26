from django.db import models
from users.models import Client

#Tuplas para choices
conditions = [('new',"Nuevo"), ('used', "Usado")]

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
    image = models.ImageField(upload_to='images/', default='default.jpg')

    def __str__(self):
        return self.title
    
class Reserve(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    dateReserved = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)

class Sale(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    dateSale = models.DateTimeField(auto_now_add=True)
    returned = models.BooleanField(default=False)

class Turned(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    description = models.TextField(blank=False)
    validated = models.BooleanField(default=False)
    image = models.ImageField(upload_to='images/', default='default.jpg')

