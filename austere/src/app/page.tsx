import ArrivalExperience from '@/components/landing/ArrivalExperience';
import PhilosophyStatement from '@/components/landing/PhilosophyStatement';
import ExclusivityRevelation from '@/components/landing/ExclusivityRevelation';
import CraftDemonstration from '@/components/landing/CraftDemonstration';
import HeritageNarrative from '@/components/landing/HeritageNarrative';
import PortraitOfPower from '@/components/landing/PortraitOfPower';
import SocialProof from '@/components/landing/SocialProof';
import Invitation from '@/components/landing/Invitation';

export default function Home() {
  return (
    <main>
      <ArrivalExperience />
      <PhilosophyStatement />
      <ExclusivityRevelation />
      <CraftDemonstration />
      <HeritageNarrative />
      <PortraitOfPower />
      <SocialProof />
      <Invitation />
    </main>
  );
}
