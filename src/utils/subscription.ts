export type SubscriptionStatus =
  | 'trial'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'expired';

interface SubscriptionData {
  subscription_status: SubscriptionStatus;
  trial_ends_at: string | null;
  subscription_ends_at: string | null;
}

export function isTrialActive(profile: SubscriptionData) {
  if (profile.subscription_status !== 'trial' || !profile.trial_ends_at) {
    return false;
  }

  return new Date(profile.trial_ends_at).getTime() > Date.now();
}

export function isSubscriptionActive(profile: SubscriptionData) {
  if (profile.subscription_status === 'active') {
    if (!profile.subscription_ends_at) {
      return true;
    }

    return new Date(profile.subscription_ends_at).getTime() > Date.now();
  }

  return isTrialActive(profile);
}

export function getTrialDaysRemaining(trialEndsAt: string | null) {
  if (!trialEndsAt) {
    return 0;
  }

  const millisecondsRemaining = new Date(trialEndsAt).getTime() - Date.now();

  if (millisecondsRemaining <= 0) {
    return 0;
  }

  return Math.ceil(millisecondsRemaining / (1000 * 60 * 60 * 24));
}
