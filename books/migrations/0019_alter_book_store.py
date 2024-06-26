# Generated by Django 5.0.4 on 2024-06-07 04:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0018_alter_book_store_alter_chat_admin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='store',
            field=models.ForeignKey(limit_choices_to={'id__in': (1, 2, 3, 4, 5)}, on_delete=django.db.models.deletion.CASCADE, to='books.store'),
        ),
    ]
