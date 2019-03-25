const dayToString = (day) => {
    let ret = "";
    switch (day) {
        case 0:
            ret = "domingo";
            break;
        case 1:
            ret = "segunda";
            break;
        case 2:
            ret = "terça";
            break;
        case 3:
            ret = "quarta";
            break;
        case 4:
            ret = "quinta";
            break;
        case 5:
            ret = "sexta";
            break;
        case 6:
            ret = "sábado";
            break;
        default:
            ret = "error";
            break;
    }
    return ret;
}