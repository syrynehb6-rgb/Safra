"""Safra AI Financial & Travel Coach powered by the Google Antigravity SDK."""

import asyncio
import math
import os
from dotenv import load_dotenv
from google.antigravity import Agent, LocalAgentConfig

load_dotenv()


def calculate_safra_savings_plan(
    destination: str,
    monthly_salary_tnd: float,
    current_savings_tnd: float,
    target_budget_tnd: float,
    save_percentage: float = 20.0,
) -> dict:
    """Calculates how much to save monthly and when the user can afford their trip.

    Args:
        destination: Target city/country (e.g., "Istanbul, Turkey").
        monthly_salary_tnd: User's monthly income in TND.
        current_savings_tnd: Current savings in TND.
        target_budget_tnd: Estimated total trip cost in TND.
        save_percentage: Percentage of salary to save each month (default 20%).
    """
    monthly_saving = max(50.0, round(monthly_salary_tnd * (save_percentage / 100.0), 2))
    remaining = max(0.0, target_budget_tnd - current_savings_tnd)
    months_needed = 0 if remaining == 0 else math.ceil(remaining / monthly_saving)

    return {
        "destination": destination,
        "monthly_saving_tnd": monthly_saving,
        "remaining_needed_tnd": remaining,
        "months_to_goal": months_needed,
    }


def find_budget_offers(destination: str, interests: str) -> dict:
    """Finds the cheapest verified travel agency and hotel matching user interests.

    Args:
        destination: Target city/country.
        interests: User hobbies/interests (e.g., "shopping modest, street food").
    """
    catalog = {
        "istanbul": {
            "cheapest_agency": "Medina Tours Tunis (1,980 TND - Flight + 5N Boutique + Bosphorus)",
            "best_budget_hotel": "Sirkeci Mansion Boutique (145 TND/night, 4.7★, near Tram T1)",
        },
        "paris": {
            "cheapest_agency": "Tunisie Evasion (2,490 TND - Flight + 4N Hotel + Seine Cruise)",
            "best_budget_hotel": "Hôtel Belleville Charm (260 TND/night, 4.5★, Metro Line 2/11)",
        },
        "dubai": {
            "cheapest_agency": "Safaruxe Agency (3,090 TND - Flight + Visa + 5N Rove Hotel)",
            "best_budget_hotel": "Rove Al Rigga (210 TND/night, 4.8★, Red Line Metro)",
        },
    }
    key = destination.lower().split(",")[0].strip()
    match = catalog.get(
        key,
        {
            "cheapest_agency": "Carthage Voyages Pro (Custom Quote)",
            "best_budget_hotel": "Verified 3-4★ Central Boutique Hotel",
        },
    )
    return {"destination": destination, "matched_for": interests, **match}


def generate_day_by_day_itinerary(destination: str, days: int, interests: str) -> dict:
    """Generates a structured day-by-day travel itinerary with transport and budget tips.

    Args:
        destination: Target city/country.
        days: Number of days for the trip.
        interests: Traveler preferences (e.g., "culture, shopping modest, food").
    """
    return {
        "destination": destination,
        "days": days,
        "interests": interests,
        "schedule": [
            f"Day 1: Arrival in {destination}, airport transit & check-in",
            f"Day 2: Historical landmarks & local street food matching '{interests}'",
            f"Day 3-{max(3, days)}: Shopping malls/boutiques, Smart Tag tracking & departure",
        ],
    }


async def main() -> None:
    if not os.getenv("GEMINI_API_KEY"):
        print("Missing GEMINI_API_KEY. Get one at https://aistudio.google.com/app/api-keys")
        return

    config = LocalAgentConfig(
        tools=[calculate_safra_savings_plan, find_budget_offers, generate_day_by_day_itinerary],
        system_instructions=(
            "You are Safra AI Coach, a warm Tunisian/French/English travel & financial advisor. "
            "Use your tools to compute exact monthly savings plans, timelines, and recommend "
            "budget-friendly agencies, hotels, and travel-buddy matches based on user interests."
        ),
    )

    async with Agent(config) as agent:
        prompt = (
            "Salaire 2200 TND, épargne 650 TND, je veux partir à Istanbul (budget ~2275 TND). "
            "J'aime le street food et le shopping modest. Combien dois-je épargner par mois et quelle offre choisir ?"
        )
        response = await agent.chat(prompt)
        print(await response.text())


if __name__ == "__main__":
    asyncio.run(main())
