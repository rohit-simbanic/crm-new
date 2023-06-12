import marketPreferenceService from 'services/market-preferences';
import eventBus from 'helpers/event-bus-helper';
import documentService from 'services/document-service';
import oppurtunityStatusOptions from 'assets/constants/oppurtunity-status-options';

const associateMpPDFTemplate = async (
    market_preference_id: string,
    pdf_template_id: string
) => {
    await marketPreferenceService.associatePDFTemplate(market_preference_id, {
        pdf_template_id: [pdf_template_id]
    });
    eventBus.dispatch('pdf_template_refresh', {});
};

const removeAssociationMpPDFTemplate = async (
    market_preference_id: string,
    pdf_template_id: string
) => {
    await marketPreferenceService.deleteAssociatedPDFTemplate(
        market_preference_id,
        pdf_template_id
    );
    eventBus.dispatch(`pdf_template_refresh`, {});
};

const generateContract = async (
    pdf_template_id: string,
    opportunity_id: string,
    associate_with_opportunity: boolean
) => {
    const response = await documentService.generateContract({
        pdf_template_id,
        opportunity_id,
        associate_with_opportunity
    });
    window.open(`${response.data.url}`);
};

const getCdaContractGenerateWarning = (opportunity_status_c: string) => {
    return `Warning: You are generating the CDA during the ${oppurtunityStatusOptions[opportunity_status_c]}. Generating the CDA at an improper status can result in incorrect commissions being mapped.`
}

export { associateMpPDFTemplate, removeAssociationMpPDFTemplate, generateContract, getCdaContractGenerateWarning };
