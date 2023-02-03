import sys
import os
from .authutil import authenticated_request

sys.path.append("..")
from wow.apiutil import api  # noqa: E402

AUTH_BASE_URL = os.environ.get("AUTH_BASE_URL")

@api
def login(request):
    post_data = {
        "grant_type": "password",
        "username": request.POST.get("username"),
        "password": request.POST.get("password"),
    }

    return authenticated_request(AUTH_BASE_URL + "/o/token/", post_data)


@api
def logout(request):
    post_data = {
        "token": request.POST.get("token"),
    }

    return authenticated_request(AUTH_BASE_URL + "/o/revoke_token/", post_data)


@api
def refresh(request):
    post_data = {
        "grant_type": "refresh_token",
        "refresh_token": request.POST.get("refresh_token"),
    }

    return authenticated_request(AUTH_BASE_URL + "/o/token/", post_data)


@api
def authenticate(request):
    post_data = {
        "grant_type": "password",
        "username": request.POST.get("username"),
        "password": request.POST.get("password"),
    }

    return authenticated_request(AUTH_BASE_URL + "/authenticate/", post_data)
