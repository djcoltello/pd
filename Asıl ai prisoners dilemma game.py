import random

def tit_for_tat(opponent_moves):
    if not opponent_moves:
        return "Cooperate"
    else:
        return opponent_moves[-1]

def ai_assistant(player_moves, computer_moves):
    if not computer_moves:
        return "Cooperate"
    else:
        last_computer_move = computer_moves[-1]
        last_player_move = player_moves[-1]

        if last_computer_move == "Defect" and last_player_move == "Cooperate":
            return "Defect"  # Retaliate if the computer defected last time and the player cooperated
        elif last_computer_move == "Cooperate" and last_player_move == "Defect":
            return "Cooperate"  # Try to rebuild cooperation if the computer cooperated last time and the player defected
        else:
            return last_player_move  # Otherwise, repeat the last move

def play_round(player_choice, computer_choice):
    if player_choice == "Cooperate" and computer_choice == "Cooperate":
        return 3, 3
    elif player_choice == "Cooperate" and computer_choice == "Defect":
        return 0, 5
    elif player_choice == "Defect" and computer_choice == "Cooperate":
        return 5, 0
    else:
        return 1, 1

def get_player_choice(ai_suggestion):
    while True:
        choice = input(f"Enter your choice (Cooperate or Defect) [AI Suggestion: {ai_suggestion}]: ").strip().capitalize()
        if choice in ["Cooperate", "Defect"]:
            return choice
        print("Invalid choice. Please enter 'Cooperate' or 'Defect'.")

def main():
    player_score = 0
    computer_score = 0
    player_moves = []
    computer_moves = []
    total_rounds = 20

    for round_number in range(1, total_rounds + 1):
        print(f"Round {round_number}")

        ai_suggestion = ai_assistant(player_moves, computer_moves)
        player_choice = get_player_choice(ai_suggestion)
        computer_choice = tit_for_tat(player_moves)

        player_moves.append(player_choice)
        computer_moves.append(computer_choice)

        print(f"Computer chose: {computer_choice}")

        player_points, computer_points = play_round(player_choice, computer_choice)
        player_score += player_points
        computer_score += computer_points

        print(f"Player earned {player_points} points, Computer earned {computer_points} points")
        print(f"Total scores - Player: {player_score}, Computer: {computer_score}\n")

    print("Game over!")
    print(f"Final scores - Player: {player_score}, Computer: {computer_score}")

if __name__ == "__main__":
    main()
