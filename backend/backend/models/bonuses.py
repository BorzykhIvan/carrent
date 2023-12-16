from django.db import models
from django.conf import settings


class BonusType(models.Model):
    id = models.AutoField(primary_key=True)

    name = models.CharField(max_length=64)
    points = models.IntegerField()
    description = models.CharField(max_length=256)
    image_url = models.URLField()


class Bonus(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bonus_type = models.ForeignKey(BonusType, on_delete=models.CASCADE)
    proof_image_url = models.URLField()
    is_accepted = models.BooleanField(default=False)
    is_declined = models.BooleanField(default=False)

    def add_to_user(self):
        self.user.points.amount += self.bonus_type.points
        self.user.points.save()


class UserPoints(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="points"
    )
    amount = models.IntegerField(default=0)
