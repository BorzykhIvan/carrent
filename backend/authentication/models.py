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
from django.core.validators import MinLengthValidator
from backend.models import UserLevel


# Create your models here.


class UserManager(BaseUserManager):
    def create_user(
        self, email, first_name, last_name, phone_number, password=None
    ) -> "User":
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
        )
        user.set_password(password)
        self.create_reftoken(user=user)
        user.save()
        return user

    def create_superuser(
        self, email, password, first_name, last_name, phone_number
    ) -> "User":
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        user = self.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
        )
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True

        user.save()
        return user

    def create_reftoken(self, user: "User"):
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
    first_name = models.CharField(_("first name"), max_length=150)
    last_name = models.CharField(_("last name"), max_length=150)
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
    birth_date = models.DateField(null=True)
    pesel = models.CharField(
        max_length=11, null=True, validators=[MinLengthValidator(11)]
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    referrer = models.ForeignKey(
        "self", on_delete=models.CASCADE, related_name="referrals", null=True
    )
    referral_token = models.CharField(max_length=16, unique=True, null=True)
    loyalty_level = models.ForeignKey(
        UserLevel, on_delete=models.CASCADE, related_name="users", default=1
    )
    loyalty_score = models.IntegerField(default=0)
    phone_number = models.CharField(max_length=15)
    objects = UserManager()

    def get_full_name(self) -> str:
        full_name = f"{self.first_name} {self.last_name}"
        return full_name.strip()

    def get_short_name(self) -> str:
        """Return the short name for the user."""
        return self.first_name

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phone_number"]


class UserAddress(models.Model):
    id = models.AutoField(primary_key=True)

    user = models.OneToOneField(User, related_name="address", on_delete=models.CASCADE)
    zip_code = models.CharField(max_length=10)
    city = models.CharField(max_length=64)
    street = models.CharField(max_length=64)
    building = models.IntegerField()


class ChangeRequest(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    change_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_accepted = models.BooleanField(default=False)
    is_declined = models.BooleanField(default=False)
