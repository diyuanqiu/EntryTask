function getSelectedChannelNames(channelPickId, channel) {
    return channel
        .filter(channel => channelPickId.includes(channel.id))
        .map(channel => channel.name)
        .join(', ');
}

export {getSelectedChannelNames};