from django.contrib import admin
from .models import Book, Store, Card, Sale, Reservation, Devolution, Chat, Message
# Register your models here.
admin.site.register(Book)
admin.site.register(Store)
admin.site.register(Card)
admin.site.register(Sale)
admin.site.register(Reservation)
admin.site.register(Devolution)
admin.site.register(Chat)
admin.site.register(Message)