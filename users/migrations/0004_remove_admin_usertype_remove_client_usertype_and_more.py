# Generated by Django 5.0.3 on 2024-05-03 04:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_admin_usertype_client_usertype_root'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='admin',
            name='userType',
        ),
        migrations.RemoveField(
            model_name='client',
            name='userType',
        ),
        migrations.RemoveField(
            model_name='root',
            name='userType',
        ),
    ]
