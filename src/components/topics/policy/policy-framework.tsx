import { PolicyIntro } from "./policy-intro";
import { PolicyPlayers } from "./policy-players";
import { PolicyChallenges } from "./policy-challenges";
import { PolicyActions } from "./policy-actions";
import { PolicyPartners } from "./policy-partners";
import { PolicyProcess } from "./policy-process";

/**
 * The full "מסמך הסכמות רחבות / מנערים 710" national framework, composed for the
 * informal-policy topic page. Each section is its own focused component.
 */
export function PolicyFramework() {
  return (
    <>
      <PolicyIntro />
      <PolicyPlayers />
      <PolicyChallenges />
      <PolicyActions />
      <PolicyPartners />
      <PolicyProcess />
    </>
  );
}
