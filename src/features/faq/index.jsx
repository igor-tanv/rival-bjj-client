import React from "react"

export default function FAQ({ }) {

  return <div>

    <h5>1.) What is the purpose of Rival?</h5>
      The purpose of Rival is to allow Grappling and BJJ competitors to compete directly
      against each other without having to attend tournaments. Every match you have
      goes into your Match History which is visible on your profile. The ultimate goal is to find out
      who are the best grapplers in your area.

      <h5>2.) How do I challenge someone to a match?</h5>
       1. Register and confirm your profile.
       2. Find someone you'd like to challenge and go to their profile.
       3. Chat with your opponent first. It's up to you and the opponent
       to determine when, where, what weight and what rules the match will be held under.
       4. Once you agree on these details, click "Issue Challenge" and fill in the Match Contract details.
       5. Once you click "Send" the match contract will be sent to your opponent who will either accept
       decline the match.
       6. On the day of the match print your match contract and bring it with you to the match.
       Give the contract to the referee before the match begins.
       7. After the match, the referee will sign and return the contract to you. If you are the winner
       it is your responsibility to take a photo of the contract (make sure the photo is readable) and send
       it to the Admin (admin contact is listed on the contract). The Admin will update your results in 48 hours.

        <h5>3.) How does the scoring system work?</h5>
        The scoring system is derived from a chess ranking algorithm and the amount of points you win or lose
        is based on the level of your opponent. For further information, you can research Method of Pairwise Comparisons.

        <h5>4.) What does the scoring number mean?</h5>
        Scores are mapped to BJJ belt levels. Note these are approximations.
        <img src="assets/rating-scale/belt-to-score.png" alt="" />

    <h5>5.) How accurate is the scoring system?</h5>
        Like any ranking system, the more you compete the more accurate
        your score becomes. After 30 matches the confidence interval of your score is considered satisfactory.

        <h5>6.)What can I do if someone is breaking the contract rules?</h5>
        After every match you can always review the integrity of your opponent.
        For serious infractions contact the system administrator (provided in the match contract).
        As a general rule, it is always a good idea to save a copy of your contract for any disputes which
        may arise later on.
  </div>

}