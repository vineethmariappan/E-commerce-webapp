# Generated by Django 3.0.5 on 2020-04-18 13:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('eCom', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product_detail',
            name='sup_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='eCom.Supplier'),
        ),
    ]
