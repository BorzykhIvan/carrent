import secrets

from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.db import IntegrityError

from backend.models import UserLevel


# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, password=None) -> "User":
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        self.create_reftoken(user=user)
        user.save()
        return user

    def create_superuser(self, email, password):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True

        user.save()
        return user

    def create_reftoken(self, user):
        while True:
            token = secrets.token_urlsafe(8)
            try:
                user.referral_token = token
                user.save()
            except IntegrityError:
                continue
            else:
                break


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(_("first name"), max_length=150, blank=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    referrer = models.ForeignKey(
        "self", on_delete=models.CASCADE, related_name="referrals", null=True
    )
    referral_token = models.CharField(max_length=16, unique=True)
    loyalty_level = models.ForeignKey(
        UserLevel, on_delete=models.CASCADE, related_name="users"
    )
    loyalty_score = models.IntegerField()
    objects = UserManager()

    def get_full_name(self):
        full_name = f"{self.first_name} {self.last_name}"
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
