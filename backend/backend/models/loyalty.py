from django.db import models

from django.utils.translation import gettext_lazy as _


class UserLevel(models.Model):
    id = models.AutoField(primary_key=True)

    level = models.IntegerField()
    discount = models.IntegerField()
    name = models.CharField(max_length=16)

    class Meta:
        verbose_name = _("UserLevel")
        verbose_name_plural = _("UserLevels")

    def __str__(self):
        return self.name
