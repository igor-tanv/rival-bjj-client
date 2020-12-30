import React from "react";
import matchTypes from "../../data/match-types.json";
import weightClasses from "../../data/weight-classes.json";
import DateTimePicker from "../../ui/date-time-picker";

export default function PDFContract({ selectedContract }) {
  const getWeightLimit = (weightClass) => {
    switch (weightClass) {
      case "OpenWeight":
        return "Open Weight";
      case "Flyweight":
        return "57.5 kg";
      case "SuperHeavyweight":
        return "100.5 kg and over'";
      default:
        return (
          weightClasses[weightClass].substring(
            weightClasses[weightClass].indexOf("-") + 2
          ) + " kg"
        );
    }
  };
  const contractStamp = (
    <img src="./assets/images/contract-stamp.png" alt="logo" />
  );
  return (
    <div style={{ display: "block" }}>
      <div
        id="contract-jumbotron"
        style={{
          width: 1000,
        }}
      >
        <div style={{ position: "relative" }}>
          {contractStamp}
          <h1>
            <center>Official Match Contract</center>
          </h1>
          <h5>
            <ol>
              <li>Print this contract and bring it to the match</li>
              <li>Sign your name in the box below</li>
              <li>
                Give this contract to the referee before the match starts along
                with 100,000VND
              </li>
              <li>Follow the Post Match Instructions</li>
            </ol>
          </h5>
          <br />
          <h1>
            <center>Match Details</center>
          </h1>
          <br />
          <div className="red-and-blue">
            <div className="red-corner-wrap">
              <h2>Red Corner:</h2>
              <h3>
                {selectedContract.playerFirstName}{" "}
                {selectedContract.playerLastName}
              </h3>
              <h3>
                Gi {selectedContract.playerGiRank} / NoGi{" "}
                {selectedContract.playerNoGiRank}
              </h3>
              <h3>Red Sign Here:</h3>
              <span />
            </div>
            <div className="blue-corner-wrap">
              <h2>Blue Corner:</h2>
              <h3>
                {selectedContract.opponentFirstName}{" "}
                {selectedContract.opponentLastName}
              </h3>
              <h3>
                Gi {selectedContract.opponentGiRank} / NoGi{" "}
                {selectedContract.opponentNoGiRank}
              </h3>
              <h3>Blue Sign Here:</h3>
              <span />
            </div>
          </div>
          <div className="lower-match-details">
            <div className="lower-match-details-left">
              <h3>Match Weight Class: {selectedContract.weightClass}</h3>
              <h3>
                Weight Limit: {getWeightLimit(selectedContract.weightClass)}
              </h3>
            </div>
            <div className="lower-match-details-middle">
              <h3>Location: {selectedContract.location} </h3>
              <h3 style={{ display: "inline-flex" }}>
                Date:
                <DateTimePicker
                  className="date-picker"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  selected={selectedContract.startsAt}
                  readOnly
                />
              </h3>
            </div>
            <div className="lower-match-details-right">
              <h3>Type: {matchTypes[selectedContract.type]}</h3>
              <h3>Match Length: 10 minutes</h3>
            </div>
          </div>
          <div className="player-comments">
            <h3 style={{ marginBottom: 5 }}>
              Rule Exceptions: {selectedContract.ruleExceptions}
            </h3>
            <span style={{ fontSize: 12 }}>
              *Rule Exceptions will override any Standard Competition Rules
              including Match Length.
            </span>
          </div>
          <div className="match-result">
            <h1>
              <center>Match Result</center>
            </h1>
            <h5>
              <center>
                (Referee completes 1-6: make sure each competitor has paid the
                Match Fee)
              </center>
            </h5>
            <h3>1. Winner (circle one): RED / BLUE / DRAW</h3>
            <h3>
              2. Win Method (circle one): Submission / DQ / Forfeit / Injury
            </h3>
            <h3>3. Comments:</h3>
            <h3>4. Referee Name: {selectedContract.refereeName}</h3>
            <h3>5. Referee Signature: </h3>
            <h3>6. Date: </h3>
          </div>
          <div className="post-match">
            <h3>Post Match Instructions: </h3>
            <ol>
              <li>Rate your opponent (below).</li>
              <li>
                After the referee completes and returns this contract to you,
                take a photo of only this page and email it to{" "}
                <u>admin@rival-bjj.com</u>. The cut-off time for sending this
                contract is 24 hours from the Match Date. If nothing is received
                from either competitor the match will be recorded as Cancelled.
              </li>
              <li>Once received, your profile will be updated in 48 hours.</li>
            </ol>
          </div>
          <div className="rate-opponent">
            <h3>Rate your Opponent (circle one number): </h3>
            <ul style={{ listStyle: "none" }}>
              <li>
                5 : Fulfilled all contract obligations and was professional,
                polite and punctual- an excellent adversary.
              </li>
              <li>
                4 : Good opponent but was slightly unprepared (late, didn't read
                the rules, etc.)- still a good match.
              </li>
              <li>
                3 : OK but with some problems. (example: host competitor did not
                have everything ready for the match).
              </li>
              <li>
                2 : Bad opponent. (Missed weight, more than 15 minutes late,
                broke the rules).
              </li>
              <li>
                1 : Terrible opponent. (Tried to cheat, became hostile, did not
                follow any rules).
              </li>
            </ul>
            <p>Other Comments (Keep it short):</p>
          </div>
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </div>

        <div style={{ position: "relative" }}>
          {contractStamp}
          <h1>Competition Rules</h1>
          <p>
            Read these rules before you send or accept any matches. They apply
            to Gi and NoGi.
          </p>
          <h3>General Rules</h3>
          Note: Competitors, coaches and referees should all be present least 15
          minutes before the match starts in order to weigh-in, warm up and
          discuss the rules below to make sure everyone is in agreement.
          <p>
            <ol>
              <li>
                No unsportsmanlike conduct will be allowed. You may be
                disqualified for unsportsmanlike conduct. The referee will be
                shown maximum respect at all times.
              </li>
              <li>
                No striking, biting, eye gouging (includes chin to eye), head
                butting, small joint manipulation (finger or toe locks), hair
                pulling, grabbing the windpipe, or ear pulling will be
                permitted.
              </li>
              <li>
                No slamming allowed. Illegal slamming will be defined as
                slamming your opponent to escape submissions and/or to pass the
                guard; or standing from the guard and/or jumping from a standing
                position to slam your opponent. Slamming will result in an
                automatic DQ. Takedowns are NOT considered slams, but you must
                deliver your opponent safely to the mat.
              </li>
              <li>
                No infectious skin diseases (such as ringworm, staph, and MRSA)
                or open wounds will be permitted. No lubricants, oils, or
                lotions of any kind will be permitted on any part of the body
                orclothing.
              </li>
              <li>
                Competitors will be allowed to continue grappling anywhere on
                the matted area, provided they don’t interfere with another
                match. If the competitors near the edge of the mat, they will be
                restarted from the same position, unless the referee is unable
                to duplicate the position for anyreason. In case the referee is
                unable to duplicate the position, the competitors will restart
                from a standing position.
              </li>
              <li>
                If a competitor flees the mat area when a submission is locked
                in and the competitor is obviously fleeing to avoid submission,
                he or she will be automatically disqualified.
              </li>
              <li>
                <u>All matches are allowed to be recorded on video</u> just like
                any other tournament. Anyone who interferes with this rule will
                receive a disqualification (DQ).
              </li>
              <li>
                Every match must have 1 Referee. This is the responsibility of
                the hosting school.
              </li>
              <li>
                The visiting competitor is allowed to bring 1 Coach or Assistant
                to the match.
              </li>
              <li>
                It is the responsibility of the hosting competitor to discuss
                these rules with his or her instructor
                <u>before sending or accepting the match contract</u>.
              </li>
              <li>
                Both competitors must weigh-in before the match starts. It is
                the responsibility of the hosting school to provide a working
                scale and failure to do so will result in a DQ for the host
                competitor. Either the visiting competitor or their
                coach/assitant may request the scales to be verified by placing
                a weight on the scale.
              </li>
              <li>
                If a competitor does not make the weight outlined in their
                contract the other competitor has the option to reject the match
                and accept a win by DQ or continue with the match.
              </li>
              <li>
                If a competitor arrives to the match 5 minutes or more past the
                Match Starting Time, the other competitor has the option to
                reject the match and accept a win by DQ or continue with the
                match.
              </li>
              <li>
                IF EITHER THE COMPETITOR OR THEIR INSTRUCTOR ATTEMPT TO CHANGE
                OR FAIL TO HONOR ANY RULES MENTIONED HERE THAT COMPETITOR WILL
                RECEIVE A DQ.
              </li>
            </ol>
          </p>
          <h3>STANDARD COMPETITION RULES</h3>
          <p>
            The standard rules for all Gi and NoGi matches are: 1 round, 10
            minutes, no points, submission only, all submissions allowed, no
            tiebreaker
          </p>
          <p>
            You are allowed to make changes to the standard rules. For example:
            "No heel hooks", "Match will be held under IBJJ Rules", "Change
            match time to 8 minutes" and so on. You must put these changes under
            "Rule Exceptions" when completing the Match Contract form. Rule
            Exceptions will override the standard rules. Once you send the
            contract, your opponent then has the option to accept or reject the
            match.
          </p>
          <h3>
            Weight Classes- Gi and NoGi <h5>(Kilograms)</h5>
          </h3>
          <ul style={{ listStyle: "none" }}>
            <li>- Flyweight: 57.5 and under</li>
            <li>- Featherweight: 57.6 - 64</li>
            <li>- Lightweight: 64.1 - 70</li>
            <li>- Welterweight: 70.1 - 76</li>
            <li>- Middleweight: 76.1 - 82.3</li>
            <li>- Cruiserweight: 82.4 - 88.3</li>
            <li>- Light-Heavyweight: 88.4 - 94.3</li>
            <li>- Heavyweight: 94.4 - 100.4</li>
            <li>- Super-Heavyweight: 100.5 and over</li>
            *For Gi matches competitors must weigh in wearing their Gi
          </ul>
        </div>
      </div>
    </div>
  );
}
