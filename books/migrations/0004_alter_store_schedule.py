# Generated by Django 5.0.4 on 2024-04-17 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_book_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='schedule',
            field=models.CharField(blank=True, default='8 AM - 6 PM', max_length=100),
        ),
    ]
