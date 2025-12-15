const Challenge = require('../models/Challenge');
const ChallengeInvite = require('../models/ChallengeInvite');

exports.inviteToChallenge = async ({ challengeId, fromUserId, toUserId, message }) => {
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) throw new Error('Challenge introuvable');

    // Optionnel: seul le créateur peut inviter
    if (String(challenge.createdBy) !== String(fromUserId)) {
        throw new Error("Seul le créateur peut inviter");
    }

    // Déjà participant => pas d'invite
    if (challenge.participants?.some(u => String(u) === String(toUserId))) {
        throw new Error("Cet utilisateur participe déjà au challenge");
    }

    const invite = await ChallengeInvite.create({
        challenge: challengeId,
        fromUser: fromUserId,
        toUser: toUserId,
        message,
    });

    return invite;
};

exports.getMyInvites = async (userId) => {
    return await ChallengeInvite.find({ toUser: userId })
        .sort({ createdAt: -1 })
        .populate('challenge')
        .populate('fromUser', 'name firstName email');
};

exports.respondToInvite = async ({ inviteId, userId, action }) => {
    const invite = await ChallengeInvite.findById(inviteId);
    if (!invite) throw new Error('Invitation introuvable');

    if (String(invite.toUser) !== String(userId)) {
        throw new Error("Tu ne peux pas répondre à cette invitation");
    }

    if (invite.status !== 'PENDING') {
        throw new Error("Invitation déjà traitée");
    }

    if (action === 'ACCEPT') {
        invite.status = 'ACCEPTED';
        await invite.save();

        await Challenge.findByIdAndUpdate(invite.challenge, {
            $addToSet: { participants: userId }
        });

        return invite;
    }

    if (action === 'DECLINE') {
        invite.status = 'DECLINED';
        await invite.save();
        return invite;
    }

    throw new Error("Action invalide (ACCEPT ou DECLINE)");
};

exports.cancelInvite = async ({ inviteId, userId }) => {
    const invite = await ChallengeInvite.findById(inviteId);
    if (!invite) throw new Error('Invitation introuvable');

    if (String(invite.fromUser) !== String(userId)) {
        throw new Error("Tu ne peux pas annuler cette invitation");
    }

    if (invite.status !== 'PENDING') {
        throw new Error("Impossible d’annuler une invitation déjà traitée");
    }

    invite.status = 'CANCELED';
    await invite.save();
    return invite;
};
