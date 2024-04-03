from django.db import models

# Create your models here.
class Store(models.Model):
    address = models.CharField(max_length=80)
    schedule = models.CharField(max_length=80)

class Book(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=False)
    author = models.CharField(max_length=100, blank=False)
    pubYear = models.PositiveIntegerField(null=False)
    gender = models.CharField(max_length=100, blank=False)
    pages = models.PositiveIntegerField(null=False)
    editorial = models.CharField(max_length=100, blank=False)
    issbn = models.CharField(max_length=50, blank=False)
    language = models.CharField(max_length=20, blank=False)
    pubDate = models.DateField(null=False)
    condition = models.CharField(max_length=20, blank=False)
    price = models.PositiveIntegerField(null=False)
    reserved = models.BooleanField()
    sold = models.BooleanField()