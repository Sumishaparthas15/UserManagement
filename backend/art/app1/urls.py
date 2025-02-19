from django.urls import path
from .views import *


urlpatterns = [
    
     path('register/', RegisterView.as_view(), name='register'),
     path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
     path('login/', LoginView.as_view(), name='login'),
     path("logout/", LogoutView.as_view(), name="logout"),
     path("refresh/", RefreshTokenView.as_view(), name="token_refresh"),

    path("profile/", ProfileView.as_view(), name="profile"),
     
     
]
