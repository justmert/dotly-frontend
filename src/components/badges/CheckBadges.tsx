import { useRouter } from "next/router";

// Hooks
import useCheckBadges from "@/models/badges/useCheckBadges";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/Card/Loader/Loader";
import NoData from "@/modules/Card/NoData/NoData";

import { IBadges } from "@/types/badges/types";
import type { BadgeIcons } from "@/types/badges/types";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaMedal,
  FaAward,
  FaRocket,
  FaHeart,
  FaSmile,
  FaThumbsUp,
  FaFlag,
  FaGem,
  FaCrown,
  FaSun,
  FaMoon,
  FaBolt,
  FaLeaf,
  FaBook,
  FaGlobe,
  FaCamera,
  FaTwitter,
  FaShieldAlt,
  FaSearch,
  FaTools,
  FaMousePointer,
  FaCalendar,
  FaBalanceScale,
  FaExchangeAlt,
  FaShip,
} from "react-icons/fa";

export default function CheckBadges() {
  const { badges, isLoading } = useCheckBadges();
  const router = useRouter();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Badges"
            tooltip=""
            route={router.asPath + "#check-badges"}
          />
        }
      />
    );

  if (!badges)
    return (
      <NoData element={<CardHeader title="Badges" tooltip="" />} message="" />
    );

  const badgeIcons: BadgeIcons = {
    "Join the party!": <FaStar color="gold" size={32} />, // Change this icon
    // Change this icon
    "Is this gift for me?": <FaMedal color="blue" size={32} />,
    "First Dip in the Gold!": <FaStar color="gold" size={32} />,
    "Call Master 300!": <FaMedal color="blue" size={32} />,
    "Hat Trick Hero!": <FaAward color="purple" size={32} />,
    "Trailblazer!": <FaRocket color="orange" size={32} />,
    "Golden Gatherer": <FaHeart color="gold" size={32} />,
    "Thousand Thrills": <FaSmile color="blue" size={32} />,
    "Elite Earner": <FaCrown color="gold" size={32} />,
    "Lavish Legend": <FaGem color="purple" size={32} />,
    "Multiverse Traveler": <FaGlobe color="blue" size={32} />,
    "Locked & Loaded": <FaShieldAlt color="green" size={32} />,
    "Democracy Defender": <FaFlag color="blue" size={32} />,
    "Nomination Knight": <FaSun color="orange" size={32} />,
    "Identity Pioneer": <FaMoon color="purple" size={32} />,
    Webmaster: <FaCamera color="blue" size={32} />,
    TweetHeart: <FaTwitter color="blue" size={32} />,
    "Judgement Joker": <FaThumbsUp color="blue" size={32} />,
    "Consistent Growth": <FaLeaf color="green" size={32} />,
    "Magnet Mogul": <FaSun color="purple" size={32} />,
    "Equilibrium Expert": <FaBalanceScale color="gold" size={32} />,
    "Chatterbox Chieftain": <FaShip color="blue" size={32} />,
    "Transfer Titan": <FaExchangeAlt color="green" size={32} />,
    "Consistent Conductor": <FaCalendar color="orange" size={32} />,
    "Consistent Creator": <FaBook color="blue" size={32} />,
    "One-Tap Wonder": <FaMousePointer color="purple" size={32} />,
    "Extrinsics Explorer": <FaSearch color="blue" size={32} />,
    "Extrinsics Enthusiast": <FaBolt color="orange" size={32} />,
    "Extrinsics Expert": <FaTools color="gold" size={32} />,
    "Extrinsics Emperor": <FaCrown color="purple" size={32} />,
  };

  function BadgesItems({ data }: { data: IBadges; index: number }) {
    return (
      <div className="md:col-span-1 col-span-4">
        <div className="border-2 border-polkadotpurple rounded-md p-4 hover:bg-gray-200/60 duration-100 h-full">
          <div className="relative flex flex-col items-center text-center py-2">
            <div className="mb-2">{badgeIcons[data.name]} </div>
            <div className="mt-2 font-semibold">{data.name}</div>
            <div className="mt-2">
              <span className="max-w-xs">{data.description}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const successBadges = badges.filter((badge) => badge.success);

  return (
    <Layout>
      <CardHeader
        title="Badges"
        tooltip=""
        route={router.asPath + "#check-badges"}
      />{" "}
      <div className="grid grid-cols-4 gap-4">
        {successBadges.map((data, index) => (
          <BadgesItems data={data} index={index} key={data.name} />
        ))}
      </div>
    </Layout>
  );
}
