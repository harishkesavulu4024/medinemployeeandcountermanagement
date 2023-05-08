package com.medin.counter.management.web.rest;

import static com.medin.counter.management.web.rest.TestUtil.sameInstant;
import static com.medin.counter.management.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.medin.counter.management.IntegrationTest;
import com.medin.counter.management.domain.StockSellerInfo;
import com.medin.counter.management.domain.User;
import com.medin.counter.management.repository.StockSellerInfoRepository;
import com.medin.counter.management.service.StockSellerInfoService;
import com.medin.counter.management.service.dto.StockSellerInfoDTO;
import com.medin.counter.management.service.mapper.StockSellerInfoMapper;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link StockSellerInfoResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class StockSellerInfoResourceIT {

    private static final String DEFAULT_DISTRIBUTOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DISTRIBUTOR_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_PAYMENT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PAYMENT_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final BigDecimal DEFAULT_TOTAL_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_AMOUNT = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/stock-seller-infos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StockSellerInfoRepository stockSellerInfoRepository;

    @Mock
    private StockSellerInfoRepository stockSellerInfoRepositoryMock;

    @Autowired
    private StockSellerInfoMapper stockSellerInfoMapper;

    @Mock
    private StockSellerInfoService stockSellerInfoServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStockSellerInfoMockMvc;

    private StockSellerInfo stockSellerInfo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StockSellerInfo createEntity(EntityManager em) {
        StockSellerInfo stockSellerInfo = new StockSellerInfo()
            .distributorName(DEFAULT_DISTRIBUTOR_NAME)
            .paymentDate(DEFAULT_PAYMENT_DATE)
            .totalAmount(DEFAULT_TOTAL_AMOUNT);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        stockSellerInfo.setUser(user);
        return stockSellerInfo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StockSellerInfo createUpdatedEntity(EntityManager em) {
        StockSellerInfo stockSellerInfo = new StockSellerInfo()
            .distributorName(UPDATED_DISTRIBUTOR_NAME)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .totalAmount(UPDATED_TOTAL_AMOUNT);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        stockSellerInfo.setUser(user);
        return stockSellerInfo;
    }

    @BeforeEach
    public void initTest() {
        stockSellerInfo = createEntity(em);
    }

    @Test
    @Transactional
    void createStockSellerInfo() throws Exception {
        int databaseSizeBeforeCreate = stockSellerInfoRepository.findAll().size();
        // Create the StockSellerInfo
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);
        restStockSellerInfoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isCreated());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeCreate + 1);
        StockSellerInfo testStockSellerInfo = stockSellerInfoList.get(stockSellerInfoList.size() - 1);
        assertThat(testStockSellerInfo.getDistributorName()).isEqualTo(DEFAULT_DISTRIBUTOR_NAME);
        assertThat(testStockSellerInfo.getPaymentDate()).isEqualTo(DEFAULT_PAYMENT_DATE);
        assertThat(testStockSellerInfo.getTotalAmount()).isEqualByComparingTo(DEFAULT_TOTAL_AMOUNT);
    }

    @Test
    @Transactional
    void createStockSellerInfoWithExistingId() throws Exception {
        // Create the StockSellerInfo with an existing ID
        stockSellerInfo.setId(1L);
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);

        int databaseSizeBeforeCreate = stockSellerInfoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStockSellerInfoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDistributorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = stockSellerInfoRepository.findAll().size();
        // set the field null
        stockSellerInfo.setDistributorName(null);

        // Create the StockSellerInfo, which fails.
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);

        restStockSellerInfoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isBadRequest());

        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPaymentDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = stockSellerInfoRepository.findAll().size();
        // set the field null
        stockSellerInfo.setPaymentDate(null);

        // Create the StockSellerInfo, which fails.
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);

        restStockSellerInfoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isBadRequest());

        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTotalAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = stockSellerInfoRepository.findAll().size();
        // set the field null
        stockSellerInfo.setTotalAmount(null);

        // Create the StockSellerInfo, which fails.
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);

        restStockSellerInfoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isBadRequest());

        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllStockSellerInfos() throws Exception {
        // Initialize the database
        stockSellerInfoRepository.saveAndFlush(stockSellerInfo);

        // Get all the stockSellerInfoList
        restStockSellerInfoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stockSellerInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].distributorName").value(hasItem(DEFAULT_DISTRIBUTOR_NAME)))
            .andExpect(jsonPath("$.[*].paymentDate").value(hasItem(sameInstant(DEFAULT_PAYMENT_DATE))))
            .andExpect(jsonPath("$.[*].totalAmount").value(hasItem(sameNumber(DEFAULT_TOTAL_AMOUNT))));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllStockSellerInfosWithEagerRelationshipsIsEnabled() throws Exception {
        when(stockSellerInfoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restStockSellerInfoMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(stockSellerInfoServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllStockSellerInfosWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(stockSellerInfoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restStockSellerInfoMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(stockSellerInfoRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getStockSellerInfo() throws Exception {
        // Initialize the database
        stockSellerInfoRepository.saveAndFlush(stockSellerInfo);

        // Get the stockSellerInfo
        restStockSellerInfoMockMvc
            .perform(get(ENTITY_API_URL_ID, stockSellerInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(stockSellerInfo.getId().intValue()))
            .andExpect(jsonPath("$.distributorName").value(DEFAULT_DISTRIBUTOR_NAME))
            .andExpect(jsonPath("$.paymentDate").value(sameInstant(DEFAULT_PAYMENT_DATE)))
            .andExpect(jsonPath("$.totalAmount").value(sameNumber(DEFAULT_TOTAL_AMOUNT)));
    }

    @Test
    @Transactional
    void getNonExistingStockSellerInfo() throws Exception {
        // Get the stockSellerInfo
        restStockSellerInfoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStockSellerInfo() throws Exception {
        // Initialize the database
        stockSellerInfoRepository.saveAndFlush(stockSellerInfo);

        int databaseSizeBeforeUpdate = stockSellerInfoRepository.findAll().size();

        // Update the stockSellerInfo
        StockSellerInfo updatedStockSellerInfo = stockSellerInfoRepository.findById(stockSellerInfo.getId()).get();
        // Disconnect from session so that the updates on updatedStockSellerInfo are not directly saved in db
        em.detach(updatedStockSellerInfo);
        updatedStockSellerInfo
            .distributorName(UPDATED_DISTRIBUTOR_NAME)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .totalAmount(UPDATED_TOTAL_AMOUNT);
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(updatedStockSellerInfo);

        restStockSellerInfoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, stockSellerInfoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isOk());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeUpdate);
        StockSellerInfo testStockSellerInfo = stockSellerInfoList.get(stockSellerInfoList.size() - 1);
        assertThat(testStockSellerInfo.getDistributorName()).isEqualTo(UPDATED_DISTRIBUTOR_NAME);
        assertThat(testStockSellerInfo.getPaymentDate()).isEqualTo(UPDATED_PAYMENT_DATE);
        assertThat(testStockSellerInfo.getTotalAmount()).isEqualByComparingTo(UPDATED_TOTAL_AMOUNT);
    }

    @Test
    @Transactional
    void putNonExistingStockSellerInfo() throws Exception {
        int databaseSizeBeforeUpdate = stockSellerInfoRepository.findAll().size();
        stockSellerInfo.setId(count.incrementAndGet());

        // Create the StockSellerInfo
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStockSellerInfoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, stockSellerInfoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStockSellerInfo() throws Exception {
        int databaseSizeBeforeUpdate = stockSellerInfoRepository.findAll().size();
        stockSellerInfo.setId(count.incrementAndGet());

        // Create the StockSellerInfo
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStockSellerInfoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStockSellerInfo() throws Exception {
        int databaseSizeBeforeUpdate = stockSellerInfoRepository.findAll().size();
        stockSellerInfo.setId(count.incrementAndGet());

        // Create the StockSellerInfo
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStockSellerInfoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStockSellerInfoWithPatch() throws Exception {
        // Initialize the database
        stockSellerInfoRepository.saveAndFlush(stockSellerInfo);

        int databaseSizeBeforeUpdate = stockSellerInfoRepository.findAll().size();

        // Update the stockSellerInfo using partial update
        StockSellerInfo partialUpdatedStockSellerInfo = new StockSellerInfo();
        partialUpdatedStockSellerInfo.setId(stockSellerInfo.getId());

        partialUpdatedStockSellerInfo.totalAmount(UPDATED_TOTAL_AMOUNT);

        restStockSellerInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStockSellerInfo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStockSellerInfo))
            )
            .andExpect(status().isOk());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeUpdate);
        StockSellerInfo testStockSellerInfo = stockSellerInfoList.get(stockSellerInfoList.size() - 1);
        assertThat(testStockSellerInfo.getDistributorName()).isEqualTo(DEFAULT_DISTRIBUTOR_NAME);
        assertThat(testStockSellerInfo.getPaymentDate()).isEqualTo(DEFAULT_PAYMENT_DATE);
        assertThat(testStockSellerInfo.getTotalAmount()).isEqualByComparingTo(UPDATED_TOTAL_AMOUNT);
    }

    @Test
    @Transactional
    void fullUpdateStockSellerInfoWithPatch() throws Exception {
        // Initialize the database
        stockSellerInfoRepository.saveAndFlush(stockSellerInfo);

        int databaseSizeBeforeUpdate = stockSellerInfoRepository.findAll().size();

        // Update the stockSellerInfo using partial update
        StockSellerInfo partialUpdatedStockSellerInfo = new StockSellerInfo();
        partialUpdatedStockSellerInfo.setId(stockSellerInfo.getId());

        partialUpdatedStockSellerInfo
            .distributorName(UPDATED_DISTRIBUTOR_NAME)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .totalAmount(UPDATED_TOTAL_AMOUNT);

        restStockSellerInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStockSellerInfo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStockSellerInfo))
            )
            .andExpect(status().isOk());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeUpdate);
        StockSellerInfo testStockSellerInfo = stockSellerInfoList.get(stockSellerInfoList.size() - 1);
        assertThat(testStockSellerInfo.getDistributorName()).isEqualTo(UPDATED_DISTRIBUTOR_NAME);
        assertThat(testStockSellerInfo.getPaymentDate()).isEqualTo(UPDATED_PAYMENT_DATE);
        assertThat(testStockSellerInfo.getTotalAmount()).isEqualByComparingTo(UPDATED_TOTAL_AMOUNT);
    }

    @Test
    @Transactional
    void patchNonExistingStockSellerInfo() throws Exception {
        int databaseSizeBeforeUpdate = stockSellerInfoRepository.findAll().size();
        stockSellerInfo.setId(count.incrementAndGet());

        // Create the StockSellerInfo
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStockSellerInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, stockSellerInfoDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStockSellerInfo() throws Exception {
        int databaseSizeBeforeUpdate = stockSellerInfoRepository.findAll().size();
        stockSellerInfo.setId(count.incrementAndGet());

        // Create the StockSellerInfo
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStockSellerInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStockSellerInfo() throws Exception {
        int databaseSizeBeforeUpdate = stockSellerInfoRepository.findAll().size();
        stockSellerInfo.setId(count.incrementAndGet());

        // Create the StockSellerInfo
        StockSellerInfoDTO stockSellerInfoDTO = stockSellerInfoMapper.toDto(stockSellerInfo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStockSellerInfoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(stockSellerInfoDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StockSellerInfo in the database
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStockSellerInfo() throws Exception {
        // Initialize the database
        stockSellerInfoRepository.saveAndFlush(stockSellerInfo);

        int databaseSizeBeforeDelete = stockSellerInfoRepository.findAll().size();

        // Delete the stockSellerInfo
        restStockSellerInfoMockMvc
            .perform(delete(ENTITY_API_URL_ID, stockSellerInfo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StockSellerInfo> stockSellerInfoList = stockSellerInfoRepository.findAll();
        assertThat(stockSellerInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
