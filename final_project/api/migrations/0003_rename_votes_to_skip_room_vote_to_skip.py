# Generated by Django 4.0 on 2021-12-17 16:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_vote_to_skip_room_votes_to_skip_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='votes_to_skip',
            new_name='vote_to_skip',
        ),
    ]
