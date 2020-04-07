# Generated by Django 3.0.3 on 2020-02-17 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('tags', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='StyleGuideEntry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=75)),
                ('section', models.CharField(choices=[('AE', 'A&E'), ('OP', 'Opinion'), ('NW', 'News'), ('SP', 'SPORTS')], default='NW', max_length=2)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('tags', models.ManyToManyField(db_index=True, to='tags.Tag')),
            ],
        ),
    ]