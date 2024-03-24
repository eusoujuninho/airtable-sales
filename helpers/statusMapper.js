// statusMapper.js
const statusMappings = {
    hotmart: {
        // Mapeia os slugs para o formato desejado para a plataforma Hotmart (tudo maiúsculo)
        toPlatformSlug: (slug) => slug.toUpperCase(),
    },
    doppus: {
        // Aqui você pode adicionar mapeamentos específicos para a plataforma Doppus se necessário
        toPlatformSlug: (slug) => slug, // Por enquanto, não altera o slug
    },
    // Adicione outras plataformas conforme necessário
};

function mapTransactionStatus(platform, slug) {
    const mapper = statusMappings[platform.toLowerCase()];
    if (!mapper) {
        console.warn(`No status mapping found for platform: ${platform}. Returning original slug.`);
        return slug; // Retorna o slug original se não encontrar mapeamento para a plataforma
    }
    return mapper.toPlatformSlug(slug);
}

module.exports = { mapTransactionStatus };
