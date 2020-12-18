import React from "react"

export default function FAQ({ }) {

  return <div>

    <h5>1.) What is the purpose of Rival?</h5>
      The purpose of Rival is to allow Grappling and BJJ competitors to compete directly
      against each other without having to attend tournaments. You choose when,
      where, what weight and what rules the match will be held under when
      you issue a challenge to your opponent.  Every completed match
      goes into your Match History which is visible on your profile. The ultimate goal is to find out
      who are the best grapplers in your area.

      <h5>2.) How do I challenge someone to a match?</h5>
       1. Register and confirm your profile.
       2. Find an opponent you'd like to challenge and go to their profile.
       3. Chat with your opponent first. It's up to you and the opponent
       to determine when, where, what weight and what rules the match will be held under.
       4. Once you agree on these details, click "Issue Challenge" and fill in the Match Contract details.
       5. Once you click "Send" the match contract will be sent to your opponent who will either accept
       or decline the match.
       6. On the day of the match print your match contract and bring it with you to the match.
       Give the contract and pay the match fee (listed in the contract) to the referee before the match begins.
       7. After the match, the referee will sign and return the contract to you. If you are the winner
       it is your responsibility to take a photo of the contract (make sure the photo is readable) and send
       it to the Admin (admin contact is listed on the contract). The Admin will update your results in 48 hours.
       8. Regardless of the match outcome both competitors can review the quality of their opponent
       in the "Rate Your Opponent" section of the match contract. Submit your rating by following the directions
       in the contract.

       <h5>3.) What if my community is not listed?</h5>
        If you don't see your community listed, send us an email at admin@rival-bjj.com
        and, depending on where you are, we may add your community to the list .

        <h5>4.) How does the scoring system work?</h5>
        The scoring system is derived from a chess ranking algorithm and the amount of points you win or lose
        is based on the rank of your opponent. For further information, research the Method of Pairwise Comparisons.

        <h5>5.) What does the my rank score mean?</h5>
        Rank scores are mapped to BJJ belt levels. Note these are approximations.
        <img src="assets/rating-scale/belt-to-score.png" alt="" />

    <h5>6.) How accurate is the ranking system?</h5>
        Like any ranking system, the more you compete the more accurate
        your rank becomes. After 30 matches the confidence interval of your rank is considered satisfactory.

        <h5>7.)What can I do if my opponent or their instructor breaks the contract rules?</h5>
        After every match you can always review the quality of your opponent.
        For serious infractions contact the system administrator (provided in the match contract).
        As a general rule, it is always a good idea to save a copy of your contract for any disputes which
        may arise later on.

        <h5>8.)What do the different tabs in my contract mean?</h5>
       All: All contracts that have your name on it
       Sent: Contracts you sent that have not been accepted or declined by the opponent
       Received: Contracts you received that have not been accepted or declined by you
       Declined: Contracts declined by you or the opponent
       Accepted: Upcoming contracts that have been accepted by you and opponent.
       This is where your print off your contract by clicking on See Details.
       Cancelled: Contracts that were accepted but then cancelled by either you or the opponent.

       <h5>3.) I cancelled or declined a contract by accident, can I reverse this?</h5>
        No. Once the match has been cancelled or declined you have to issue a new contract.
  </div>

}