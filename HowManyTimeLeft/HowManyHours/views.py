from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
import requests
from urllib.parse import urlencode

def home(request):
    return render(request, 'home.html')

def search_games(request):
    search_query = request.GET.get('search', '')
    page = request.GET.get('page', 1)
    page_size = request.GET.get('page_size', 20)

    if not search_query:
        return JsonResponse({'error': 'Search query is required'}, status=400)

    params = {
        'key': settings.RAWG_API_KEY,
        'search': search_query,
        'page': page,
        'page_size': page_size,
    }

    try:
        response = requests.get(
            'https://api.rawg.io/api/games',
            params=params,
            timeout=10
        )
        response.raise_for_status()
        return JsonResponse(response.json())
    except requests.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)

def game_details(request, game_id):
    try:
        response = requests.get(
            f'https://api.rawg.io/api/games/{game_id}',
            params={'key': settings.RAWG_API_KEY},
            timeout=10
        )
        response.raise_for_status()
        return JsonResponse(response.json())
    except requests.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)

