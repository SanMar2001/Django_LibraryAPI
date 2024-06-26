# Generated by Django 5.0.4 on 2024-04-12 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='reserved',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='book',
            name='sold',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='store',
            name='address',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='store',
            name='schedule',
            field=models.CharField(max_length=100),
        ),
    ]
