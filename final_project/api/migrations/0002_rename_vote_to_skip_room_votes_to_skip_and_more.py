# Generated by Django 4.0 on 2021-12-17 16:45

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='vote_to_skip',
            new_name='votes_to_skip',
        ),
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.CharField(default=api.models.generate_unique_join_code, max_length=8, unique=True),
        ),
    ]
