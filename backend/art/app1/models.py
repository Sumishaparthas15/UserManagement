from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
import random,string
from datetime import timedelta
from django.utils.timezone import now

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    is_email_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, null=True, blank=True)
    otp_expiry = models.DateTimeField(null=True, blank=True)
    otp_attempts = models.IntegerField(default=0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    groups = models.ManyToManyField(Group, related_name="customuser_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="customuser_permissions", blank=True)

    def __str__(self):
        return self.email
    
    def generate_otp(self):
        """ Generate a 6-digit OTP and set expiry time """
        self.otp = ''.join(random.choices(string.digits, k=6))
        self.otp_expiry = now() + timedelta(minutes=5)
        self.otp_attempts = 0  # Reset attempts
        self.save()

    def verify_otp(self, entered_otp):
        """ Verify OTP with expiration and attempt limits """
        if self.otp_attempts >= 5:
            return False, "Too many failed attempts. Request a new OTP."

        if not self.otp or not self.otp_expiry or self.otp_expiry < now():
            return False, "OTP expired. Request a new one."

        if self.otp == entered_otp:
            self.is_email_verified = True
            self.otp = None  # Clear OTP after successful verification
            self.otp_expiry = None
            self.save()
            return True, "Email verified successfully."

        self.otp_attempts += 1
        self.save()
        return False, "Invalid OTP. Please try again."

