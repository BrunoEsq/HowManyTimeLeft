from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/games/search/', views.search_games, name='search_games'),
    path('api/games/<int:game_id>/', views.game_details, name='game_details'),
]