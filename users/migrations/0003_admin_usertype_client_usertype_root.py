# Generated by Django 5.0.4 on 2024-04-12 16:25

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_admin_dni'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='admin',
            name='userType',
            field=models.CharField(default='admin', max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='client',
            name='userType',
            field=models.CharField(default='client', max_length=10, null=True),
        ),
        migrations.CreateModel(
            name='Root',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userType', models.CharField(default='root', max_length=10, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
