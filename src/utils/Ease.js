class Ease {
    static EaseOutCircular(progress) {
        return Math.sqrt(1 - Math.pow(progress - 1, 2));
    }

    static EaseOutQuadratic(progress) {
        return progress * (2 - progress);
    }
}

export { Ease };
