from django.db import models

class clientAuthdeatils(models.Model):
    username = models.CharField(max_length=50)   #verbose_name="Primary Domain"
    password = models.CharField(max_length = 50)
    isExisted = models.BooleanField(default = False)
